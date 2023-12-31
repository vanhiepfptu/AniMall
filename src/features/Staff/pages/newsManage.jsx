import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateDialog from "./Dialog/NewsDialog/CreateDialog";
import { enqueueSnackbar, useSnackbar } from "notistack";
import "./NewsManage.css";
import UpdateDialog from "./Dialog/NewsDialog/UpdateDialog";
function NewsManage() {
  const { enqueueSnackbar } = useSnackbar();
  const [listNews, setlistNews] = useState([]);
  const [idSelectNews, setIdSelectNews] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const fetchAllNewsList = async (id) => {
    console.log(id);
    try {
      if (!id) {
        const response = await fetch(`${url}/news`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const rpData = await response.json();
          if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
            setlistNews(rpData.data);
            console.log(rpData.data);
          }
        }
      } else {
        const response = await fetch(`${url}/categories/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const rpData = await response.json();
          if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
            setlistNews(rpData.data.newsList);
            console.log(rpData.data.newsList);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  //api category
  const fetchAllCategories = async () => {
    try {
      // Lấy danh sách danh mục
      const response = await fetch(`${url}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const rpData = await response.json();
        if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
          setCategories(rpData.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAllNewsList(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleSelectNews = (id) => {
    setIdSelectNews(id);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };
  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };
  function handleCloseCreateDialog() {
    setCreateDialogOpen(false);
  }
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const limitTextToWords = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const limitedText = words.slice(0, wordCount).join(" ");
    return limitedText + " ...";
  };
  return (
    <Container sx={{ display: "flex" }}>
      <Grid item xs={12} sm={3} md={2} lg={2}>
        <div className="sidebar">
          <Typography variant="h5">Categories</Typography>
          <List>
            <ListItem button onClick={() => handleCategorySelect()}>
              <ListItemText primary={"Tất cả bài báo"} />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                key={category.idCategory}
                button
                onClick={() => handleCategorySelect(category.idCategory)}
              >
                <ListItemText primary={category.categoryName} />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      <Grid className="main-content">
        <Grid style={{ display: "flex" }}>
          <Grid xs={12} sx={{ width: "80%" }}>
            <h1 style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              NEWS MANAGEMENT
            </h1>
          </Grid>
          <Grid xs={2} sx={{ paddingTop: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenCreateDialog}
            >
              Create new
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {listNews.length > 0 ? (
            listNews
              .filter(
                (item) =>
                  !selectedCategory || item.category.id === selectedCategory.id
              )
              .map((item) => (
                <Grid item xs={12} sm={6} md={5} lg={5} key={item.idNews}>
                  <Card
                    sx={{
                      width: "100%",
                      // display: "flex",
                      // flexDirection: "column",
                    }}
                  >
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">R</Avatar>}
                      title={item.title}
                      subheader={
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}
                        >
                          {item.category && item.category.categoryName}
                        </div>
                      }
                    />
                    <CardMedia
                      component="img"
                      height={300}
                      image={item.images[0].url}
                    />
                    <CardContent style={{ flex: "1" }}>
                      <Typography variant="body2" color="text.secondary">
                        {limitTextToWords(item.content, 10)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleSelectNews(item.idNews)}
                      >
                        Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
          ) : (
            <Grid sx={{ paddingTop: 5, paddingLeft: 2 }}>
              <Typography variant="h5">
                Không có bài viết liên quan nào
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* Create news */}
      <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
        <CreateDialog
          fetchAllNewsList={fetchAllNewsList}
          handleCloseCreateDialog={handleCloseCreateDialog}
        ></CreateDialog>
      </Dialog>
      {/* Update news */}
      <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
        <UpdateDialog idSelectNews={idSelectNews}></UpdateDialog>
      </Dialog>
    </Container>
  );
}

export default NewsManage;
