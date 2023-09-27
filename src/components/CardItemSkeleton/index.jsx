import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";

const CardItemSkeleton = () => {
  return (
    <Card
      sx={{ width: 265 }}
      elevation={4}
    >
      <CardActionArea>
        <CardMedia>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="140px"
          ></Skeleton>
          <CardContent>
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem" }}
            />
            <Skeleton
              variant="text"
              width="50%"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              width="50%"
              sx={{ fontSize: "1rem" }}
            />
          </CardContent>
        </CardMedia>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="58px"
          height="26px"
          sx={{ borderRadius: 1 }}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rectangular"
          width="89px"
          height="26px"
          sx={{ borderRadius: 1 }}
          animation="wave"
        ></Skeleton>
      </CardActions>
    </Card>
  );
};
export default CardItemSkeleton;
