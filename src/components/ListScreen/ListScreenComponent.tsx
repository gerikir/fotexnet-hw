import React from "react";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import Layout from "../Layout";
import Image from "next/image";

interface Artist {
    id: string;
    name: string;
    portrait: string;
    albumCount: number;
}

interface ListScreenComponentProps {
    title: string;
    artists: Artist[];
    page: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    totalPages: number;
}

const ListScreenComponent: React.FC<ListScreenComponentProps> = ({ artists, page, onPageChange, totalPages }) => {

    return (
        <Layout>
            <div className="py-12">
                <Typography variant="h4" component="h1" className="text-center">
                    Artists
                </Typography>
                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {artists && artists.length > 0 ? (
                        artists.map((artist) => (
                            <div key={artist.id} className="mb-4">
                                <Card className="flex h-[300px] flex-col !rounded-lg">
                                    <Image
                                        src={artist.portrait}
                                        alt={artist.name}
                                        width={500}
                                        height={140}
                                        className="h-[140px] w-full rounded-t-lg object-cover"
                                    />
                                    <CardContent className="!flex flex-1 !flex-col !justify-between !pb-4">
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            className="line-clamp-3 overflow-hidden text-ellipsis"
                                        >
                                            {artist.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Albumok száma: {artist.albumCount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <Typography variant="h6" color="text.secondary">
                            Nincsenek elérhető művészek.
                        </Typography>
                    )}
                </div>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={onPageChange}
                    color="primary"
                    className="mt-10 flex justify-center"
                />
            </div>
        </Layout>
    );
};

export default ListScreenComponent;
