import moment from "moment"
import { Link } from "react-daisyui"
import { IoTrashOutline } from "react-icons/io5"

const AutomationCard = ({
  automation,
  onDelete
}: {
  automation: any
  onDelete: (id: string) => void
}) => {
  return <div className='card p-10 w-full shadow-lg overflow-hidden'>
      <div className="w-full flex justify-end items-start">
        <button onClick={() => onDelete(automation.id)}><IoTrashOutline /></button>
      </div>

      <div className='flex justify-between items-start gap-3'>
        <div className='grow text-red font-semibold'>
          <Link href={`/automations/edit/${automation.id}`}
            className="block mb-2"
          >{automation.title}</Link>
        </div>
        <div className='w-[50px] text-center'>
          n/a
        </div>
        <div className='w-[50px] text-center'>
          n/a
        </div>
        <div className='w-[150px] text-sm text-slate-400'>
          {moment(automation.updatedAt).fromNow()}
        </div>
      </div>

      {automation.automationTriggers.map((trigger) => <div className='flex justify-between items-start gap-2'>
        <div className='grow pl-5 pr-5'>
          <div className='flex justify-between items-start'>
            <div className='grow text-slate-500'>
              {trigger?.title}
            </div>
            <div className='w-[60px]'>on/off</div>
          </div>
        </div>
        <div className='w-[50px] bg-blue-300 text-center'>
          {trigger.runCount}
        </div>
        <div className='w-[50px]  text-center'>
          {trigger.ctrCount}
        </div>
        <div className='w-[150px]'>
          
        </div>
        </div>)}
        
      </div>
}

export default AutomationCard