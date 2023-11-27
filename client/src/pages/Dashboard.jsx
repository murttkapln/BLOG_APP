import { useEffect } from "react"
import useBlogCall from "../hooks/useBlogCall"
import { Container, Grid } from "@mui/material"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import BlogCard from "../components/BlogCard"
import News from "../components/News"
import BlogTrending from "../components/BlogTrending"

const Dashboard = () => {


  const { getBlog } = useBlogCall()
  const { blogs } = useSelector(state => state.blog)

  useEffect(() => {
    getBlog('blogs')

  }, [])

  return (
    <>

      <Header />
      
      <BlogTrending blogs={blogs} />

      <Container maxWidth={'xl'} >


        <Grid container columnSpacing={5} mt={5} >
          <Grid item xs={12} md={5} lg={7} display={'flex'} flexDirection={'column'} gap={3} >
            {
              blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
            }
          </Grid>

          <hr style={{ marginLeft: '40px', marginTop: '100px' }} />

          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} md={4} lg={4} >
            <News />
          </Grid>
          
        </Grid>

      </Container>
    </>
  )
}

export default Dashboard