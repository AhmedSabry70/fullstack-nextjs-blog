
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 

import {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)


const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['blockquote', 'code-block'],

        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
    },
    imageDrop: true,
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
   /* VideoResize: {
           modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
       },  */
   
   

}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block',
    'script',
    'direction',
    'size',
    'color',
    'background',
    'font',
    'align',
    'clean',
]





const QuillEditor = ({ setContent, content }) => {
   
    return (
        <ReactQuill
            theme='snow'
            // placeholder={placeholder}
            defaultValue={content}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
        />
    )
}

export default QuillEditor