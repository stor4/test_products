import {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { dispatch, useStoreState } from '../store/store';


interface ProductProps {
    name: string;
    id: string;
    price: string;
    src: string;
}
  

const Product = () => {
    const likedProducts = useStoreState('liked')
    
    const [item, setItem] = useState({
        name: '',
        id: '',
        price: '',
        src: ''
    })
    const { id } = useParams()

    const isLiked = likedProducts.some((p: any) => p.id === item.id);

    const toggleLike = () => {
        if (isLiked) {
          dispatch({ type: 'delete', productId: item.id });
        } else {
          dispatch({ type: 'add', product: item });
        }
    }
    
    useEffect(() => {
        fetch(`https://testbackend.nc-one.com/image?id=${id}`)
        .then(response => response.json())
        .then(data => setItem(data))
        .catch(error => console.error('An error occurred:', error))
        console.log(item)
    }, [])
    

    return (
        <Box sx={{width: '1185px', display: 'flex', mt: '60px', ml: '135px'}}>
    <img style={{height: '400px'}} src={`https://testbackend.nc-one.com${item.src}`}/>
    <Box sx={{ mt: '110px', ml: '25px'}}>
      {item.name && (
        <Typography sx={{color: '#414141', fontFamily: 'Poppins', fontSize: '30px', fontWeight: 400}}>
          {item.name}
        </Typography>
      )}
      <Box sx={{mt: '40px', display: 'flex'}}>
        {item.price && (
          <Typography sx={{color: '#414141', fontFamily: 'Poppins', fontSize: '30px', fontWeight: 600}}>
            $ {item.price}
          </Typography>
        )}
        <Box sx={{mt: '11px', ml: '100px', backgroundColor: '#FFCC26', borderRadius: '5px', height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => {
          toggleLike()
          console.log('Product added:', item);
        }}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Box>
      </Box>
    </Box>
  </Box>
    )
}

export default Product

