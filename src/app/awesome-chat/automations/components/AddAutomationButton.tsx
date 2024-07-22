'use client'

import { createAutomation } from "@/actions/automations"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

const AddAutomationButton = () => {
  const {
    isPending, isSuccess, data, mutate: addAutomation
  } = useMutation({
    mutationKey: ['createAutomation'],
    mutationFn: () => createAutomation()
  })

  useEffect(() => {
    if(isSuccess && data){
      if(data.id){
        console.log('asd')
        window.location.href = `/automations/edit/${data.id}`
      }
    }
  }, [data, isSuccess])

  return (
    <div>
      <button 
        className="btn btn-primary"
        onClick={() => addAutomation()}
        disabled={isPending}
      >{isPending ? <span className="loading loading-spinner loading-md"></span> : 'Tambah Automation'}</button>
    </div>
  )
}

export default AddAutomationButton