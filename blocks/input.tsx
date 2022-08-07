import {useState} from 'react'
import {useRouter} from 'next/router'

function Input() {
    const router = useRouter()
    const [v, setValue] = useState("")

    function handleFormSubmit(event) {
        event.preventDefault();
        router.push(`/query?q=${encodeURIComponent(v)}`)
  }
    
    return (
        <div className="flex justify-center gap-x-24">
            <form onSubmit={handleFormSubmit}>
                <label className="text-3xl font-bold underline">Search here:</label>
                <input placeholder="Type here to search..." value={v} onChange={(e)=>{
            event.preventDefault();
            setValue(e.target.value)}} />
                <button type="submit" className="px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100">Search</button>
            </form>
        </div>
    )
}
export default Input