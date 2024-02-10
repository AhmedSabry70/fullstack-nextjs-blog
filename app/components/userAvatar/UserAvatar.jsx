import React from 'react'

import styles from './userAvatar.module.css'
import avatarInit from '@/utils/avatarInit'
import { useSession } from 'next-auth/react'

const UserAvatar = (props) => {
    const {data}=useSession()
  return (
    <div className={styles.avatarContainer} /* data-label='AS' */ style={{backgroundColor:`rgb(${avatarInit(data?.user?.name)})`}}>
        {data?.user?.name.substring(0,2)}
    </div>
  )
}

export default UserAvatar