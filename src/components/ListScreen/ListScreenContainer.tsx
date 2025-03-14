import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import ListScreenComponent from "./ListScreenComponent";

export type TArtist = {
    id: string;
    name: string;
    albumCount: number;
    portrait?: string;
};

interface ArtistResponse {
    data: TArtist[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    pagination: {
        total_pages: number;
    };
}

export const ABC = [
    "A",
    "Á",
    "B",
    "C",
    "D",
    "E",
    "É",
    "F",
    "G",
    "H",
    "I",
    "Í",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ó",
    "Ö",
    "Ő",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "Ú",
    "Ü",
    "Ű",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const ListScreenContainer = () => {
    const router = useRouter();
    const [artists, setArtists] = useState<TArtist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [serverError, setServerError] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tempSearchTerm, setTempSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const perPage = 50;

    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedLetter, setSelectedLetter] = useState<string>("");

    useEffect(() => {
        if (!router.isReady) return;

        const { page, search, type, letter } = router.query;
        const pageValue = page && typeof page === "string" ? parseInt(page) : 1;
        const searchValue = search && typeof search === "string" ? search : "";
        const typeValue = type && typeof type === "string" ? type : "";
        const letterValue = letter && typeof letter === "string" ? letter : "";

        setCurrentPage(pageValue);
        setSearchTerm(searchValue);
        setTempSearchTerm(searchValue);
        setSelectedType(typeValue);
        setSelectedLetter(letterValue);

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();
                params.append("include_image", "true");
                params.append("page", pageValue.toString());
                params.append("per_page", perPage.toString());

                if (searchValue) params.append("search", searchValue);
                if (typeValue) params.append("type", typeValue);
                if (letterValue) params.append("letter", letterValue);

                const url = `https://exam.api.fotex.net/api/artists?${params.toString()}`;
                
                const response = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    if (response.status === 500) {
                        setServerError(true);
                    } else {
                        setError(`HTTP error! Status: ${response.status}`);
                    }
                    return;
                }

                const data: ArtistResponse = await response.json();
                setArtists(data.data);
                setTotalPages(data.pagination.total_pages);
            } catch (err) {
                console.error("API call error:", err);
                setError("An error occurred while loading the data");
                setArtists([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, router.query]);

    const updateUrl = (params: Record<string, string | number>) => {
        const query: Record<string, string | number> = {};
        
        if (params.page && params.page !== 1) query.page = params.page;
        if (params.search) query.search = params.search;
        if (params.type) query.type = params.type;
        if (params.letter) query.letter = params.letter;
        
        router.push(
            {
                pathname: router.pathname,
                query,
            },
            undefined,
            { shallow: true },
        );
    };

    const handlePageChange = (page: number) => {
        updateUrl({
            page,
            search: searchTerm,
            type: selectedType,
            letter: selectedLetter
        });
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateUrl({
            page: 1,
            search: tempSearchTerm,
            type: selectedType,
            letter: selectedLetter
        });
        setSearchTerm(tempSearchTerm);
    };

    const clearSearch = () => {
        setTempSearchTerm("");
        updateUrl({
            page: 1,
            search: "",
            type: "",
            letter: ""
        });
        setSearchTerm("");
        setSelectedType("");
        setSelectedLetter("");
    };

    const handleTypeChange = (value: string) => {
        updateUrl({
            page: 1,
            search: searchTerm,
            type: value,
            letter: selectedLetter
        });
        setSelectedType(value);
    };

    const handleLetterChange = (value: string) => {
        updateUrl({
            page: 1,
            search: searchTerm,
            type: selectedType,
            letter: value
        });
        setSelectedLetter(value);
    };

    return (
        <ListScreenComponent
            artists={artists}
            loading={loading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            searchTerm={tempSearchTerm}
            selectedType={selectedType}
            selectedLetter={selectedLetter}
            handlePageChange={handlePageChange}
            handleTypeChange={handleTypeChange}
            handleLetterChange={handleLetterChange}
            handleSearchSubmit={handleSearchSubmit}
            clearSearch={clearSearch}
            setTempSearchTerm={setTempSearchTerm}
            ABC={ABC}
            serverError={serverError}
        />
    );
};

export default ListScreenContainer;