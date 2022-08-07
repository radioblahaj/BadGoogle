import { GetServerSideProps } from 'next'
import Input from '../blocks/input'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

type Result = {
  url: string
  title: string
  synopsis: string
}

function Result({ url, title, synopsis }: Result) {
  return (
    <div className="border border-black">
      <h3 className="text-2xl hover:font-blue"> <a href={url}> {title} </a></h3>
      <p className="text-sm font-grey-500 text-grey">{synopsis}</p>
    </div>
  )
}


const QueryPage = () => {
  const [results, setResults] = useState()
  const router = useRouter()

  useEffect(() => {
    async function lol() {
      console.log(router.query)
      if (!router.query || !router.query.q) {
        router.push('/');
        return
      }
      const nq = new URLSearchParams({
        q: router.query.q
      })
      const r = await (await fetch(`../api/search?${nq.toString()}`)).json()
      setResults(r.organic_results.map((e) => {
        return {
          url: e.link,
          title: e.title,
          synopsis: e.snippet

        }
      }))
    }

    lol()
  }, [])

  return (
    <div className="min-h-screen flex flex-col place-content-center">
      <Input />
      {results ? results.map((r) => (<Result url={r.url} title={r.title} synopsis={r.synopsis} />)) : <p>Loading, please wait...</p>}
    </div>
  )
}


export default QueryPage



