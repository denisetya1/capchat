'use client'

import { getAutomationById } from "@/actions/automations";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import ModalSelectTrigerType from "../../components/ModalSelectTrigerType";
import { useEffect, useState } from "react";
import { deleteAutomationTrigger, upsertAutomationTrigger } from "@/actions/automationTrigger";
import TriggerConfig from "../../components/TriggerConfig";
import { IoTrashOutline } from "react-icons/io5";

const CreatePage = () => {
  const params = useParams<{ automationId: string}>()
  const [activeTrigger, setActiveTrigger] = useState<string|null>(null)
  const {
    data: automationData,
    refetch: refetchAutomation,
    isLoading
  } = useQuery({
    queryKey: ['automation', params.automationId],
    queryFn: () => getAutomationById(params.automationId)
  })

  const {
    isPending,
    isSuccess: isSuccessUpsertTrigger,
    mutate: upsertTrigger,
    data: triggerUpsertResponse
  } = useMutation({
    mutationKey: ['addTrigger'],
    mutationFn: (data: AutomationTriggerDTO) => upsertAutomationTrigger(data)
  })

  const {
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
    mutate: deleteTrigger,
    data: triggerDeleteResponse
  } = useMutation({
    mutationKey: ['addTrigger'],
    mutationFn: (id: string) => deleteAutomationTrigger(id)
  })

  const addTrigger = (triggerId: number, title: string) => {
    upsertTrigger({
      automationId: params.automationId,
      title,
      automationTriggerTypeId: triggerId
    })
  }

  const removeTrigger = (triggerId: string) => {
    deleteTrigger(triggerId)
  }

  useEffect(() => {
    if (isSuccessUpsertTrigger && !isPending || (isSuccessDelete && !isPendingDelete)) {
      refetchAutomation()
    }

  }, [refetchAutomation, isPending, isSuccessUpsertTrigger, isSuccessDelete, isPendingDelete])

  return (
    <div className="w-full">
      <div>
        {automationData && automationData.title}
      </div>

      <div className="flex justify-around w-full">

        <div className="card w-1/2 shadow-lg p-5">
          {automationData?.automationTriggers.map((trigger) => <div 
            className={`bg-gray-50 p-5 rounded-md mb-4 cursor-pointer ${activeTrigger === trigger.id ? 'border-[2px] border-blue-300' :''}`}
            onClick={() => setActiveTrigger(trigger.id)}
          >
            {activeTrigger && activeTrigger === trigger.id && <TriggerConfig 
              data={trigger}
            />}
            
            {activeTrigger !== trigger.id && <div className="relative">
              <div className="absolute right-[-10px] top-[-10px]">
                <button 
                  onClick={() => removeTrigger(trigger.id)} 
                  className="text-slate-400 text-sm"
                >
                  <IoTrashOutline />
                </button>
              </div>
              <div>{trigger.title}</div>
            </div>}

          </div>)}

          {isPending && <div className="flex justify-center items-center"><span className="loading loading-ring loading-md"></span></div>}

          <button className="btn" onClick={()=>document?.getElementById('modalSelectTrigger')?.showModal()}> + Add Trigger</button>
        </div>

        <div className="card w-1/2 shadow-lg p-5">
          asdsa
        </div>
      </div>

      <ModalSelectTrigerType 
        onSelect={addTrigger}
      />

    </div>
  )
}

export default CreatePage