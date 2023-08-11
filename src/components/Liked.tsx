import {useEffect} from 'react'
import {Box, Typography, Card} from '@mui/material'
import { useStoreState, dispatch } from '../store/store'
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../fonts/fonts.css'

interface Product {
    name: string;
    price: number;
    src: string;
    id: number;
}

const Liked = () => {
    const likedProducts = useStoreState('liked')

    const toggleLike = (productId: number) => {
        const isLiked = likedProducts.some((p: Product) => p.id === productId)
    
        if (isLiked) {
          dispatch({ type: 'delete', productId })
        }
      }
    
      const isLiked = (productId: number) =>
        likedProducts.some((p: Product) => p.id === productId)

    useEffect(() => {
        console.log('Liked products updated:', likedProducts)
      }, [likedProducts])

  return (
    <div style={{width: '30%', 
              height: '800px', 
              marginLeft: '100px',
              marginTop: '100px',
              padding: '5px',
              backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='45' ry='45' stroke='%23333' stroke-width='2' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
    borderRadius: '45px',}}>
        <Typography sx={{fontFamily: 'Anek Telugu', 
        fontWeight: '600', 
        color: '#414141',
        mt: '45px',
        ml: '30px',
        fontSize: '24px'
        }}>
            FAVORITES
        </Typography>
        <Box sx={{height: '100%', ml: '15px'}}>
      <AutoSizer>
          {({ height, width }: any) => (
            <List
              height={700}
              width={width}
              itemCount={likedProducts.length}
              itemSize={150} 
            >
              {({ index, style }) => (
                <Box key={likedProducts[index].id} sx={{ ...style, height: '130px', display: 'flex', border: 'none'}}>
                  <img src={`https://testbackend.nc-one.com${likedProducts[index].src}`} alt={likedProducts[index].name} style={{height: '108px', width: '108px'}}/>
                  <Box sx={{ ml: '20px'}}>
                    <Typography sx={{ color: '#414141', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 400, width: '250px' }}>{likedProducts[index].name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <Typography sx={{ color: '#414141', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 400 }}>$ {likedProducts[index].price}</Typography>
                        <Box sx={{ mt: '3px', backgroundColor: '#FFCC26', borderRadius: '5px', height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        onClick={() => toggleLike(likedProducts[index].id)}>
                        {isLiked(likedProducts[index].id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </List>
          )}
        </AutoSizer>

        </Box>
    </div>
  )
}

export default Liked