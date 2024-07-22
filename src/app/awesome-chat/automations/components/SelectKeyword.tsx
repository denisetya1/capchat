'use client'

import { useState } from "react"

const SelectKeyword = ({
  onChange
}: {
  onChange: (value: string)=>void
}) => {
  const [keyword, setKeyword] = useState('')
  const [isAllComment, setIsAllComment] = useState(false)

  return (
    <div className="mt-5 w-full">
      <h3 className="font-semibold mb-2">
        Comment atau Keyword
      </h3>
      <div className="flex flex-col gap-2 w-full">
        <div onClick={()=> setIsAllComment(false)} className={`rounded-md p-3 border-[2px] ${isAllComment ? 'border-gray-300' : 'border-green-400'}`}>
          <label>Spesisfik Keyword</label>

          <div className="w-full">
            <input className="input input-bordered w-full" type="text" name="keyword" value={keyword}/>
          </div>
        </div>

        <div onClick={()=> setIsAllComment(true)} className={`rounded-md p-3 border-[2px] ${isAllComment ? 'border-green-400' : 'border-gray-300'}`}>
          Semua Comment
        </div>
      </div>

    </div>
  )
}

export default SelectKeyword