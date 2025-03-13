import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ListScreenComponent from "./ListScreenComponent";

interface Artist {
    id: string;
    name: string;
    portrait: string;
    albumCount: number;
}

const ListScreenContainer: React.FC = () => {
    const [title, setTitle] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    per_page: "50",
                    include_image: "true",
                });
                const response = await fetch(`https://exam.api.fotex.net/api/artists?${params}`);
                const data = await response.json();
                console.log("data", data);
                setTitle(data.title || "");
                setArtists(data.data || []);
                setTotalPages(data.pagination?.total_pages || 0);
            } catch (error) {
                console.error("Error fetching artists:", error);
                setArtists([]);
                setTotalPages(0);
            }
        };
        fetchArtists();
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        router.push({
            pathname: "/",
            query: { page: value },
        });
    };

    return (
        <ListScreenComponent
            artists={artists}
            page={page}
            onPageChange={handlePageChange}
            title={title}
            totalPages={totalPages}
        />
    );
};

export default ListScreenContainer;
