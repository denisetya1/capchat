import { useEffect, useState } from "react"
import { debounce } from 'lodash';
import { RxCross1 } from "react-icons/rx";

const SelectReplies = () => {
  // const [text, setText] = useState<string>('')
  const [repliesText, setRepliesText] = useState('')
  const [textForm, setTextForm] = useState<string[]>([])
  
  useEffect(()=> {
    if(repliesText === ''){
      const defaultText: string = 'abc|:|def|:|gfk';
      setRepliesText(defaultText)
      const splitted = defaultText.split('|:|')
      setTextForm(splitted)
    } else {
      const splitted = repliesText.split('|:|')
      setTextForm(splitted)
    }
  }, [])

  const addText = (text: string, index: number) => {
    const newVal = [...textForm];
    newVal[index] = text

    setTextForm((oldVal) => [...newVal])
  }

  const newForm = () => {
    setTextForm((oldVal) => [...oldVal, ''])
  }

  const removeForm = (index: number) => {
    const current = [...textForm]
    current.splice(index, 1).values();

    setTextForm((oldVal) => [...current])
  }

  return (
    <div className="mt-5">
      <h3 className="font-semibold mb-2">Pilih Reply</h3>
      <div>
        <div className="flex flex-col gap-2">
          {textForm.map((t, idx) => <div key={idx} className="relative">
            <input onChange={(e) => addText(e.target.value, idx) } name="textForm[]" value={textForm[idx]} className="input input-bordered w-full" />
            <button className="absolute text-gray-400 hover:text-red-500 right-3 top-[50%] translate-y-[-50%]" onClick={() => removeForm(idx)}><RxCross1 /></button>
          </div>)}
        </div>

        <div className="mt-2">
          <button 
            className="btn btn-primary w-full"
            onClick={newForm}
          >+ Reply baru</button>
        </div>

      </div>
    </div>
  )
}

export default SelectReplies