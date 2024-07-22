'use client'

import { deleteAutomationById, getAutomationList } from '@/actions/automations'
import AddAutomationButton from './components/AddAutomationButton'
import AutomationCard from './components/AutomationCard'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const Page = () => {
  const {
    data: automations,
    isLoading,
    isSuccess,
    refetch: refetchAutomation
  } = useQuery({
    queryKey: [""],
    queryFn: () => getAutomationList()
  })

  const {
    data: deleteResponse,
    isPending,
    isSuccess: isDeleteSuccess,
    mutate: deleteAutomation
  } = useMutation({
    mutationKey: [""],
    mutationFn: (id: string) => deleteAutomationById(id)
  })

  useEffect(() => {
    if(!isPending && isDeleteSuccess){
      refetchAutomation()
    }
  }, [isPending, isDeleteSuccess])



  return (
    <div className='w-full h-full'>
      <div className='flex justify-end items-center mb-4'>
        <AddAutomationButton />
      </div>

      <div className='flex flex-col justify-start gap-5 items-start'>
        {automations && automations.map((automation) => <AutomationCard 
          automation={automation} key={automation.id} 
          onDelete={deleteAutomation}
        />)}
      </div>
    </div>
  )
}

export default Page