'use client'

import { getListAccountByUserId } from "@/actions/instagram"
import { getMediaList } from "@/actions/instagramAPI"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export type SelectPostValue = {
  instagramId?: string,
  username?: string,
  postId?: string,
  postCaption?: string,
  postThumbnailUrl?: string,
  postType?: string,
  postTimestamp?: Date,
  postPermalink?: string,
  isAllPost?: boolean,
}

const SelectPost = ({
  onChange,
  value
}: {
  onChange: (value: SelectPostValue) => void,
  value: SelectPostValue
}) => {
  const [igId, setIgId] = useState<string>('')
  const [singlePost, setSinglePost] = useState(false)
  const {
    instagramId,
    username,
    postId,
    postCaption,
    postThumbnailUrl,
    postType,
    postTimestamp,
    postPermalink,
    isAllPost
  } = value

  const { 
    data: dataAccounts,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [""],
    queryFn: () => getListAccountByUserId("cly8oljsh0000v7is9zh4onqu")
  })

  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isSuccess: isSuccessPost,
    refetch: getPostList
  } = useQuery({
    queryKey: ["getMedia", igId],
    queryFn: () => getMediaList(igId),
    enabled: igId !== ''
  })

  useEffect(()=>{
    if(igId === '' && dataAccounts && dataAccounts?.length > 0) {
      setIgId(dataAccounts[0].instagramId)
    }
    
    if(igId !== ''){
      getPostList()
    }

  }, [igId, dataAccounts])

  useEffect(()=>{
    if(postId && postId === '') {
      setSinglePost(true)
    }
  }, [postId])

  const onValueChange = (changeValue: SelectPostValue) => {
    onChange(changeValue)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold mb-2">Pilih Post atau Reels</h3>

      <div onClick={()=>onValueChange({...value, isAllPost: false})} className={`rounded-md p-3 border-[2px] ${isAllPost ? 'border-gray-300' : 'border-green-400'}`}>
        
        <h3 className="font-semibold mb-2">Specific Post atau Reels</h3>

        {singlePost && <div className="flex w-full h-[200px]">
          <a className="block w-full h-full" href={postPermalink} target="_blank">
            <div>{username}</div>
            <img src={postThumbnailUrl} />
            <div>{postCaption}</div>
          </a>
        </div>}

        {!singlePost && <div className={`${isAllPost ? 'hidden': 'block'} mt-3`}>
          <div className="mb-3">
            {isLoading && <span className="loading loading-ring loading-md"></span>}
            {dataAccounts && <select value={igId} onChange={(e) => setIgId(e.target.value)} className="select select-bordered w-full max-w-xs">
              {dataAccounts.map((ig) => <option value={ig.instagramId} key={ig.instagramId}>{ig.username}</option>)}
            </select>}
          </div>

          <div className="border-[2px] border-slate-200 p-2 rounded-md h-[200px] overflow-y-auto">
            {dataPost && dataPost.data.length > 0 && <div className="grid grid-cols-5 gap-2 overflow-y-auto">
              {dataPost.data.map((post: any) => <div className="h-[90px] rounded-md overflow-hidden">
                <label className="w-full h-full relative cursor-pointer">
                  <img className="object-cover w-full h-full" src={post.thumbnail_url} />
                  <input className="absolute radio radio-secondary top-[5px] right-[5px]" type="radio" name="post" value={post.id}/>
                </label>
              </div>)}
            </div>}
          </div>
        </div>}

      </div>

      <div onClick={()=>onValueChange({...value, isAllPost: true})} className={`rounded-md p-3 border-[2px] ${isAllPost ? 'border-green-400' : 'border-gray-300'}`}>
        Semua Post atau Reels
      </div>

    </div>
  )
}

export default SelectPost