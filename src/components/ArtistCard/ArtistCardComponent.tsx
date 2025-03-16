import { TArtist } from "../ArtistListScreen/ArtistListScreenContainer";
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

const ArtistCardComponent = ({ artist }: { artist: TArtist }) => (
    <Card key={artist.id} elevation={4} className="flex flex-col overflow-hidden !rounded-lg">
        <div className="relative h-0 w-full pt-[100%]">
            <Image
                src={artist.portrait || "/album-placeholder.png"}
                alt={artist.name}
                fill
                sizes="500px"
                priority
                className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/100 to-transparent lg:h-3/4" />
            <CardContent className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 text-white">
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    className="!m-0 line-clamp-4 overflow-hidden text-ellipsis !break-words lg:!text-xl lg:!leading-6 xl:!text-3xl xl:!leading-8"
                    title={artist.name}
                >
                    {artist.name}
                </Typography>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-white">
                    <Typography variant="h6" component="h6" color="black" className="text-center !text-base">
                        {artist.albumCount}
                    </Typography>
                </div>
            </CardContent>
        </div>
    </Card>
);

export default ArtistCardComponent;
