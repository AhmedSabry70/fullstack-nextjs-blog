'use client'
import React, { useMemo } from 'react'

import dynamic from "next/dynamic";
import styles from './writePage.module.css'
import { redirect } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import ImageUploader from '../components/imageUploader/ImageUploader';
import { slugify } from '@/utils/slugify';
//import QuillEditor from '../components/textEditor/QuillEditor';
import SelectMenu from '../components/selectMenu/SelectMenu';


const postDataInti = {
    title: '',
    slug: '',
    desc: '',
    seoTitle: '',
    seoDesc: '',
}

const MAX_TAGS = 10;




const WritePage = () => {

    const { data, status } = useSession()

    const [content, setContent] = useState('')
    const [postMeta, setPostMeta] = useState(postDataInti)
    const [media, setMedia] = useState()
    const [tags, setTags] = useState([])
    const [cats, setCats] = useState('')
    const [categories, setCategories] = useState('')

    //useMemo(() => first, [second])
    const QuillEditor = useMemo(() => {

        return dynamic(() => import("../components/textEditor/QuillEditor"), {

            loading: () => <p>loading...</p>,

            ssr: false,

        });

    }, []);
    useLayoutEffect(() => {
        const prevUlr = localStorage.getItem('loghis');


        if (status !== 'authenticated' && status !== 'loading') {

            if (prevUlr === '/login' || prevUlr === null || prevUlr === '/write') return redirect('/')
            return redirect(prevUlr)

        }
    }, [status])

    useEffect(() => {
        (async function () {
            const getData = async () => {
                let res = await fetch("http://localhost:3000/api/categories", {
                    cache: "no-store",

                })



                if (!res.ok) {
                    return res = []
                    throw new Error('failed coz there some thing is wrong')
                }

                return res.json()

            }
            const data = await getData()
            setCategories(data)
        })()

        /* return () => {
          
        } */
    }, [])

    if (status === 'loading') return <h1 className={styles.loading}>Loading.....</h1>

    const handleChange = ({ target }) => {
        const { name, value } = target;
        return setPostMeta(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {

        const res = await fetch('http://localhost:3000/api/posts',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postMeta,
                    slug: slugify(postMeta.title),
                    featuredImage: media,

                    content,
                    catSlug: cats,
                    tags,
                })
            }
        )

        setContent('')
        setPostMeta(postDataInti)
        setMedia('')
        setTags([])
        setCats('')
        setCategories('')

    }

    const handleTag = (e) => {
        if (e.key === 'Enter') {
            let tag = e.target.value.trim()
            let threeWords = tag.split(' ').length <= 3
            let tagsGroup = tag.split(',')
            tagsGroup = tagsGroup > MAX_TAGS ? (tagsGroup.length = 10) : tagsGroup
            if (tags.length < MAX_TAGS && tag.length > 1 && threeWords && !tags.includes(tag)) {
                setTags(prev => ([...new Set([...prev, ...tagsGroup])]))
                e.target.value = ''

            }
        }
    }
    const removeTag = (e) => {
        const value = e.target.parentNode.dataset.tag
        const filterTags = tags.filter(tag => tag !== value)

        setTags(filterTags)
    }

    const removeAllTags = (e) => {
        e.preventDefault()
        setTags([])
    }



    return (
        <div className={styles.container}>
            <div className={styles.introFace}>
                <div className={styles.welcom}>Hello, <span className={styles.username}>{data?.user?.name}</span></div>
                <div>
                    <div className={styles.actionsBtn}>
                        <button className={`${styles.button} ${styles.cancelBtn}`}>Cancel</button>
                        <button className={`${styles.button} ${styles.publishBtn}`} onClick={(e) => handleSubmit(e)}>Publish changes</button>
                        <button className={`${styles.button} ${styles.moreOpitions}`}>...</button>

                    </div>
                </div>


            </div>

            <div className={`${styles.wrapper} ${styles.basicDetails}`}>
                <h4 className={styles.title}>Basic details</h4>
                <div className={styles.iputContainer}>
                    <input type="text" name='title' onChange={(e) => handleChange(e)} className={styles.input} id="" placeholder='Post title' />
                    <input type="text" name='desc' onChange={(e) => handleChange(e)} className={styles.input} id="" placeholder='Short description' />
                </div>
            </div>

            <ImageUploader handleMedia={setMedia} />


            <div className={`${styles.wrapper} ${styles.postContent}`}>
                <h4 className={styles.title}>Content</h4>
                <div className={styles.textEditor}>
                    <QuillEditor setContent={setContent} content={content} />

                </div>
            </div>

            <div className={`${styles.wrapper} ${styles.postMeta}`}>
                <h4 className={styles.title}>Meta</h4>
                <div className={styles.iputContainer}>
                    <input type="text" name='seoTitle' onChange={(e) => handleChange(e)} className={styles.input} id="" placeholder='SEO title' />
                    <input type="text" name='seoDesc' onChange={(e) => handleChange(e)} className={styles.input} id="" placeholder='SEO description' />
                </div>
            </div>


            <div className={`${styles.wrapper} ${styles.tagBox}`}>
                <div>
                    <h4 className={styles.title}>Tags</h4>
                    <p className={styles.note}>Press enter or add a comma after each tag</p>
                    <p className={styles.note}><strong>{MAX_TAGS - tags.length}</strong> Tags are remaining</p>

                    <br />
                    <br />
                    <br />

                    <div className={styles.actionsBtn}>
                        <button className={`${styles.button} ${styles.publishBtn}`} disabled={tags < 1} onClick={(e) => removeAllTags(e)}>Remove All</button>
                    </div>
                </div>

                <div className={''}>

                    <ul className={styles.tagContent}>
                        {tags.map((tag, index) => (
                            <li className={styles.tag} data-tag={tag} key={index}>{tag} <i onClick={(e) => removeTag(e)} className={styles.cancelTag}>&times;</i></li>
                        ))}

                        <input type="text" name='' disabled={tags.length >= MAX_TAGS} onKeyUp={(e) => handleTag(e)} className={styles.tagInput} id="" placeholder='' />

                    </ul>
                </div>
            </div>


            <div className={`${styles.wrapper} ${styles.tagBox}`}>
                <div>
                    <h4 className={styles.title}>Category</h4>
                    <p className={styles.note}>Press enter or add a comma after each tag</p>
                    <p className={styles.note}><strong>{MAX_TAGS - tags.length}</strong> Tags are remaining</p>

                    <br />
                    <br />
                    <br />

                    <div className={styles.actionsBtn}>
                        <button className={`${styles.button} ${styles.publishBtn}`} disabled={tags < 1} onClick={(e) => removeAllTags(e)}>Remove All</button>
                    </div>
                </div>

                <div className={''}>

                    <SelectMenu options={categories} label='Choose a Category' setSelectValue={setCats} />
                </div>
            </div>

        </div>
    )
}


export default WritePage