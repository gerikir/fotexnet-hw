import React, { ChangeEvent, FormEvent } from "react";
import Layout from "../Layout";
import ArtistCard from "../ArtistCard";
import ArtistCardSkeleton from "../ArtistCard/ArtistCardSkeletonComponent";
import { TArtist } from "./ArtistListScreenContainer";
import Image from "next/image";
import {
    Pagination,
    Select,
    MenuItem,
    TextField,
    FormControl,
    Button,
    Switch,
    FormControlLabel,
    Typography,
} from "@mui/material";


interface TProps {
    loading: boolean;
    error: string | null;
    serverError: boolean;
    artists: TArtist[];
    totalPages: number;
    currentPage: number;
    searchTerm: string;
    selectedType: string;
    selectedLetter: string;
    ABC: string[];
    handlePageChange: (page: number) => void;
    handleSearchSubmit: (e: FormEvent) => void;
    setTempSearchTerm: (search: string) => void;
    handleTypeChange: (value: string) => void;
    handleLetterChange: (value: string) => void;
    clearSearch: () => void;
    showAlbumCover: boolean;
    handleShowAlbumCoverSwitch: (include: boolean) => void;
}

const ArtistListScreenComponent = ({
    loading,
    error,
    serverError,
    artists,
    totalPages,
    currentPage,
    searchTerm,
    selectedType,
    selectedLetter,
    ABC,
    handlePageChange,
    handleSearchSubmit,
    setTempSearchTerm,
    handleTypeChange,
    handleLetterChange,
    clearSearch,
    showAlbumCover,
    handleShowAlbumCoverSwitch,
}: TProps) => {
    return (
        <Layout>
            <div className="py-12">
                <Typography variant="h4" component="h4">
                    Artists
                </Typography>

                <div className="mb-14 mt-8">
                    <div className="grid grid-cols-12 gap-4 lg:grid-cols-10">
                        <div className="col-span-full md:col-span-6 lg:col-span-2">
                            <form onSubmit={(e) => handleSearchSubmit(e)}>
                                <div className="relative">
                                    <TextField
                                        variant="outlined"
                                        placeholder="Search by name"
                                        value={searchTerm}
                                        onChange={(e) => setTempSearchTerm(e.target.value)}
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                height: 40,
                                                backgroundColor: "white",
                                            },
                                        }}
                                    />
                                    <button type="submit" className="absolute right-3 top-2.5">
                                        <Image src="/search.svg" alt="Search" width={20} height={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-full md:col-span-6 lg:col-span-2">
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    value={selectedType}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                    displayEmpty
                                    sx={{
                                        "& .MuiSelect-outlined": {
                                            backgroundColor: "white",
                                        },
                                    }}
                                >
                                    <MenuItem value="">All types</MenuItem>
                                    <MenuItem value="is_composer">Composer</MenuItem>
                                    <MenuItem value="is_performer">Performer</MenuItem>
                                    <MenuItem value="is_primary">Primary</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-span-full md:col-span-6 lg:col-span-2">
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    value={selectedLetter}
                                    onChange={(e) => handleLetterChange(e.target.value)}
                                    displayEmpty
                                    sx={{
                                        "& .MuiSelect-outlined": {
                                            backgroundColor: "white",
                                        },
                                    }}
                                >
                                    <MenuItem value="">All letters</MenuItem>
                                    {ABC.map((letter) => (
                                        <MenuItem key={letter} value={letter}>
                                            {letter}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-span-full flex items-center justify-between gap-6 md:col-span-6 lg:col-span-4">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showAlbumCover}
                                        onChange={(e) => handleShowAlbumCoverSwitch(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Show album cover"
                                className="!m-0 whitespace-nowrap"
                            />
                            <Button onClick={clearSearch} className="!whitespace-nowrap">
                                Reset filters
                            </Button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                        {[...Array(8)].map((_, index) => (
                            <ArtistCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="my-8 flex justify-center">
                        <p className="w-auto rounded-md border border-red-500 bg-red-50 p-4 text-center text-red-500">
                            {error}
                        </p>
                    </div>
                )}

                {serverError && (
                    <div className="my-8 flex justify-center">
                        <p className="w-auto rounded-md border border-red-500 bg-red-50 p-4 text-center text-red-500">
                            Server error occurred. Please try to refresh the page.
                        </p>
                    </div>
                )}

                {!loading && !error && !serverError && (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                            {artists.length > 0 ? (
                                artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
                            ) : (
                                <div className="col-span-full text-center">
                                    <p>No results found for the search criteria.</p>
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event: ChangeEvent<unknown>, page: number) => handlePageChange(page)}
                                color="primary"
                                size="large"
                                className="mt-20 flex justify-center"
                            />
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ArtistListScreenComponent;
