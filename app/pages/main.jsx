import React, { useState, useEffect, useRef } from "react"
import Spinner from "../componets/spinner.jsx"
import { ToastContainer, toast } from 'react-toastify';
import { END_POINT, API_KEY } from "../const"
import Image from "../componets/Image.jsx"
import 'react-toastify/dist/ReactToastify.css';

function Main() {
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState([])
  const [searchText, setSearchText] = useState("")
  const [offset, setOffSet] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [lastElement, setLastElement] = useState(null)
  const countsPerPage = useRef(0)


  const handleChange = (e) => {
    const text = e.target.value
    setSearchText(text)
  }

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setOffSet((no) => no + 1);
        }
      })
  );

  const handleSearch = async () => {
    setLoading(true);
    if (searchText === "") {
      toast("Please input the search text")
      return
    }
    const query = searchText.replaceAll("\\s", "+");
    const response = await fetch(`${END_POINT}?api_key=${API_KEY}&q=${query}`)
    const body = await response.json()
    const { count, total_count } = body.pagination
    countsPerPage.current = count
    setGifs(body.data)
    setTotalPage(Math.floor(total_count / count) + 1)
    setLoading(false);
  }

  const fetchNextPage = async () => {
    setLoading(true);
    const query = searchText.replaceAll("\\s", "+");
    const response = await fetch(`${END_POINT}?api_key=${API_KEY}&q=${query}&offset=${offset*countsPerPage.current}`)
    const body = await response.json()
    const newList = new Set([...gifs, ...body.data])
    setGifs(Array.from(newList))
    setLoading(false);
  }

  useEffect(() => {
    if (offset <= totalPage) {
      fetchNextPage();
    }
  }, [offset]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <main className="main">
      <section className="container">
        <h1 className="main-title">Stash GIFs</h1>
        <div className="main-search">
          <input placeholder="Input the search word." onChange={handleChange} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="main-results">
          {gifs.length > 0 && gifs.map((item, i) => <Image key={i} src={item.images.fixed_height.url}></Image>)}
          {loading && <Spinner />}
          {offset <= totalPage && gifs.length > 0 && <span ref={setLastElement}></span>}
        </div>
        <ToastContainer />
      </section>
    </main>
  )
}

export default Main