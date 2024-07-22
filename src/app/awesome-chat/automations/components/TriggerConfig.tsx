import React, { useState } from 'react'
import SelectPost, { SelectPostValue } from './SelectPost'
import SelectReplies from './SelectReplies'
import SelectKeyword from './SelectKeyword'
import { Prisma } from '@prisma/client'

type AutomationTrigger = Prisma.AutomationTriggerGetPayload<{
  select: { 
    id: true,
    title: true,
    instagramId: true,
    instagram: {
      select: {
        username: true
      }
    },
    postId: true,
    postCaption: true,
    postType: true,
    postThumbnailUrl: true,
    postPermalink: true,
    postTimestamp: true,
    isAllPost: true,
    isAllComment: true,
    replies: true,
    runCount: true,
    ctrCount: true,
    isActive: true,
  }
}>

const TriggerConfig = ({
  data
}: {
  data: AutomationTrigger
}) => {
  const [finalValue, setFinalValue] = useState<AutomationTrigger>({...data})
  
  const onChangePost = (value: SelectPostValue) => {
    setFinalValue((oldVal) => ({...oldVal, ...value}))
  }

  const onChangeKeyword = (value: string) => {
    
  }

  const onChangeReplies = (value: string) => {
    
  }

  return (
    <div>
      <div>
        <SelectPost 
          onChange={onChangePost}
          value={{
            instagramId: data.instagramId,
            username: data.instagram?.username,
            postId: data.postId,
            postCaption: data.postCaption,
            postThumbnailUrl: data.postThumbnailUrl,
            postType: data.postType,
            postTimestamp: data.postTimestamp,
            postPermalink: data.postPermalink,
            isAllPost: data.isAllPost
          }}
        />
      </div>
      <div>
        <SelectKeyword 
          onChange={onChangeKeyword}
          value={{
            isAll: data.isAll,
            keyword: data.keyword
          }}
        />
      </div>
      <div>
        <SelectReplies 
          onChange={onChangeReplies}
          value={data.replies}
        />
      </div>
      <div><button className='btn btn-primary'>Save</button></div>
    </div>
  )
}

export default TriggerConfig