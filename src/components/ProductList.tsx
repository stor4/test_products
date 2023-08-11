import { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { dispatch, useStoreState } from '../store/store';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


interface Product {
  name: string;
  price: number;
  src: string;
  id: number;
}

function ProductList() {
  const [list, setList] = useState<Product[]>([])
  const likedProducts = useStoreState('liked')

  const toggleLike = (productId: number) => {
    const isLiked = likedProducts.some((p: any) => p.id === productId)

    if (isLiked) {
      dispatch({ type: 'delete', productId })
    } else {
      const productToAdd = list.find((product) => product.id === productId)
      if (productToAdd) {
        dispatch({ type: 'add', product: productToAdd })
      }
    }
  };

  useEffect(() => {
    fetch('https://testbackend.nc-one.com/image')
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error('An error occurred:', error))
    console.log(list)
  }, [])

  return (
    <Box sx={{ width: '100%', ml: '150px', mt: '100px' }}>
      <Grid container spacing={2}>
        {list.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <div
              style={{
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '250px',
                padding: '15px',
                backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='45' ry='45' stroke='%23333' stroke-width='2' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                borderRadius: '45px',  
              }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  style={{ height: '232px', width: '232px' }}
                  src={`https://testbackend.nc-one.com${product.src}`}
                  alt={product.name}
                />
                <Typography sx={{ color: '#414141', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 400 }}>
                  {product.name}
                </Typography>
                </Link>
                
                <Box sx={{display: 'flex', height: '25px'}}>
                <Typography sx={{ color: '#414141', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, pt: '8px' }}>
                  $ {product.price}
                </Typography>
              
              <Box
                sx={{ mt: '3px', ml: '100px', backgroundColor: '#FFCC26', borderRadius: '5px', height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                onClick={() => {
                  toggleLike(product.id);
                }}
              >
                {likedProducts.some((p: any) => p.id === product.id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Box>
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList;
