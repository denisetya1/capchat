'use client'

import { getAutomationTriggerTypeList } from "@/actions/automationTriggerType"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const ModalSelectTrigerType = ({
  onSelect
}: {
  onSelect: (id: number, title: string) => void
}) => {
  const {
    isLoading,
    data,
    refetch
  } = useQuery({
    queryKey: ['trigerType'],
    queryFn: () => getAutomationTriggerTypeList()
  })

  console.log('ddd',data)

  useEffect(()=>{
    refetch()
  }, [refetch])

  return (
    <dialog id="modalSelectTrigger" className="modal">
      <div className="modal-box">

        <h3 className="font-bold text-lg">Pilih Trigger</h3>

        <form method="dialog" className="modal-backdrop">
          <div className="flex justify-between gap-5">
            {isLoading && <div><span className="loading loading-spinner text-primary"></span></div>}
            {data && data.map((trigger) => <div className="card shadow-md">
              <button className="p-5 text-slate-600" 
                onClick={() => onSelect(trigger.id, trigger.title)}
              >
                {trigger.title}
              </button>
            </div>)}
          </div>

          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  )
}

export default ModalSelectTrigerType