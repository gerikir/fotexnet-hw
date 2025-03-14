import React, { ChangeEvent, FormEvent } from "react";
import { TArtist } from "./ListScreenContainer";
import {
    Card,
    CardContent,
    Typography,
    Pagination,
    Select,
    MenuItem,
    TextField,
    FormControl,
    Skeleton,
    Button,
} from "@mui/material";
import Layout from "../Layout";
import Image from "next/image";

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
}

const ListScreenComponent = ({
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
}: TProps) => {
    return (
        <Layout>
            <div className="py-12">
                <Typography variant="h4" component="h4">
                    Artists
                </Typography>

                <div className="mb-14 mt-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        <div className="col-span-1">
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
                        <div className="col-span-1">
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
                        <div className="col-span-1">
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
                        <div className="col-span-1 flex items-center">
                            <Button onClick={clearSearch} className="">
                                Reset filters
                            </Button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[...Array(8)].map((_, index) => (
                            <Card key={index} elevation={0} className="flex h-[300px] flex-col !rounded-lg !shadow-md">
                                <Skeleton variant="rectangular" width="100%" height="300px" className="rounded-t-lg" />
                                <CardContent className="!flex flex-1 !flex-col !justify-between !pb-4">
                                    <Skeleton width="60%" />
                                    <Skeleton width="40%" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="my-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {serverError && (
                    <div className="my-8">
                        <p className="text-red-500">Server error occurred. Please try to refresh the page.</p>
                    </div>
                )}

                {!loading && !error && !serverError && (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {artists.length > 0 ? (
                                artists.map((artist) => (
                                    <Card
                                        key={artist.id}
                                        elevation={0}
                                        className="flex h-[300px] flex-col !rounded-lg !shadow-md"
                                    >
                                        {artist.portrait ? (
                                            <div className="relative h-[140px] w-full">
                                                <Image
                                                    src={artist.portrait}
                                                    alt={artist.name}
                                                    fill
                                                    priority
                                                    sizes="500px"
                                                    className="absolute inset-0 rounded-t-lg object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height="140px"
                                                className="rounded-t-lg"
                                            />
                                        )}

                                        <CardContent className="!flex flex-1 !flex-col !justify-between !pb-4">
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                                className="line-clamp-3 overflow-hidden text-ellipsis !leading-6"
                                                title={artist.name}
                                            >
                                                {artist.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Albumok száma: {artist.albumCount}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
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
                                className="mt-20 flex justify-center"
                            />
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ListScreenComponent;
