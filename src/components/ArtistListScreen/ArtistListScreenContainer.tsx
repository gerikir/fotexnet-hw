import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import ArtistListScreenComponent from "./ArtistListScreenComponent";

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

interface SearchParams {
    page: number;
    search: string;
    type: string;
    letter: string;
    showAlbumCover: boolean;
}

const ArtistListScreenContainer = () => {
    const router = useRouter();
    const perPage = 50;

    const [artists, setArtists] = useState<TArtist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [serverError, setServerError] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useState<SearchParams>({
        page: 1,
        search: "",
        type: "",
        letter: "",
        showAlbumCover: false,
    });

    const [tempSearchTerm, setTempSearchTerm] = useState<string>("");

    useEffect(() => {
        if (!router.isReady) return;

        const { page, search, type, letter, include_image } = router.query;

        const newParams: SearchParams = {
            page: page && typeof page === "string" ? parseInt(page) : 1,
            search: search && typeof search === "string" ? search : "",
            type: type && typeof type === "string" ? type : "",
            letter: letter && typeof letter === "string" ? letter : "",
            showAlbumCover: include_image === "true",
        };

        setSearchParams(newParams);
        setTempSearchTerm(newParams.search);
    }, [router.isReady, router.query]);

    useEffect(() => {
        fetchArtists();
    }, [searchParams]);

    const fetchArtists = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("page", searchParams.page.toString());
            params.append("per_page", perPage.toString());

            if (searchParams.search) params.append("search", searchParams.search);
            if (searchParams.type) params.append("type", searchParams.type);
            if (searchParams.letter) params.append("letter", searchParams.letter);
            if (searchParams.showAlbumCover) params.append("include_image", "true");

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

    const updateUrl = (newParams: Partial<SearchParams>) => {
        const updatedParams = { ...searchParams, ...newParams };

        const query: Record<string, string> = {};

        if (updatedParams.page !== 1) query.page = updatedParams.page.toString();
        if (updatedParams.search) query.search = updatedParams.search;
        if (updatedParams.type) query.type = updatedParams.type;
        if (updatedParams.letter) query.letter = updatedParams.letter;
        if (updatedParams.showAlbumCover) query.include_image = "true";

        // Router frissítése
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
        updateUrl({ page });
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateUrl({ page: 1, search: tempSearchTerm });
    };

    const clearSearch = () => {
        setTempSearchTerm("");
        updateUrl({ page: 1, search: "", type: "", letter: "" });
    };

    const handleTypeChange = (value: string) => {
        updateUrl({ page: 1, type: value });
    };

    const handleLetterChange = (value: string) => {
        updateUrl({ page: 1, letter: value });
    };

    const handleShowAlbumCoverSwitch = (include: boolean) => {
        updateUrl({ showAlbumCover: include });
    };

    return (
        <ArtistListScreenComponent
            artists={artists}
            loading={loading}
            error={error}
            totalPages={totalPages}
            currentPage={searchParams.page}
            searchTerm={tempSearchTerm}
            selectedType={searchParams.type}
            selectedLetter={searchParams.letter}
            handlePageChange={handlePageChange}
            handleTypeChange={handleTypeChange}
            handleLetterChange={handleLetterChange}
            handleSearchSubmit={handleSearchSubmit}
            clearSearch={clearSearch}
            setTempSearchTerm={setTempSearchTerm}
            showAlbumCover={searchParams.showAlbumCover}
            handleShowAlbumCoverSwitch={handleShowAlbumCoverSwitch}
            ABC={ABC}
            serverError={serverError}
        />
    );
};

export default ArtistListScreenContainer;
