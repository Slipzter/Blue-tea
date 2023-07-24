'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";
import GuestCard from "@/app/(components)/GuestCard";

function SearchPage() {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/guest/search/" + encodedSearchQuery)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Product not found");
            }
            return res.json();
        })
        .then((data) => {
            setProducts(data);
            setLoading(false);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        setProducts([]);
        setLoading(false);
    });
}, [])

    if (isLoading) return <p>Loading..</p>
    if (!products || products.length === 0) return (

            <div className="page_not_found">
                    <h1>404</h1>
                    <h3>Produkten hittades inte</h3>
                <div className="not_found_error card">
                    <Link href="/guest/home"><p>Sök igen...</p></Link>
                </div>
            </div>
    )
    return (
    <>   
        <div className="search-page">
         <img src="/food2.jpg" alt="food" className="search-img" /> 
        </div> 
            <div>
            {products.map((product: Product, index: number)=>{
                return (
                    <div className="search-card-container" key={index}>
                        <GuestCard searchQuery={encodedSearchQuery} livsmedelsnamn={product.livsmedelsnamn} energi_kcal={product.energi_kcal} fett_totalt_g={product.fett_totalt_g} kolhydrater_g={product.kolhydrater_g} protein_g={product.protein_g}/>
                    </div>
                )
            })}
            </div> 
        </>
        )
    }

export default SearchPage;