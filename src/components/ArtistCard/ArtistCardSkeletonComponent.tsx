import { Card, CardContent, Skeleton } from "@mui/material";

const ArtistCardSkeletonComponent = () => (
    <Card elevation={4} className="flex flex-col overflow-hidden !rounded-lg">
        <div className="relative h-0 w-full pt-[100%]">
            <Skeleton variant="rectangular" width="100%" height="100%" className="absolute inset-0 object-cover" />
            <CardContent className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 text-white">
                <Skeleton width="70%" />
                <Skeleton width="40%" />
            </CardContent>
        </div>
    </Card>
);

export default ArtistCardSkeletonComponent;
