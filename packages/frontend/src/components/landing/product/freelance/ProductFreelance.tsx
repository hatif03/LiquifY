import { Box, Button, Flex } from '@chakra-ui/react';
import { useLanding } from '../../../../front-provider/src';
import { FC } from 'react';
import ArrowRightIcon from '../../../icons/ArrowRightIcon';
import Image from 'next/image';
import { useResponsive } from '../../../hooks/useResponsive';

const ProductFreelance: FC = () => {
  const { setSignupModalOpen } = useLanding();
  const {mobileDisplay, desktopDisplay, tabletDisplay} = useResponsive();
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      minH={{md: '300px', lg: "500px"}}
      maxH="500px"
      position="relative"
      my={16}
    >
      {(desktopDisplay || tabletDisplay) && <>
        <Box
          position="absolute"
          w="calc(100% - 3.4rem)"
          h="100%"
          left="0"
          zIndex="0"
          borderRadius="64px"
          overflow="hidden"
          filter="drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))"
        >
          <Image src="/images/landing/freelance-top.jpg" alt="Kingdom of talents" fill />
        </Box>
        <Box
          position="absolute"
          w="45%"
          background="linear-gradient(180deg, #EDF2F7 0%, rgba(237, 242, 247, 0.3) 100%)"
          h="100%"
          zIndex="1"
          right="0"
        />
      </>}
      <Flex flexDir="column" alignItems={{base: 'center', md: "end"}} zIndex="2" position="relative" ml="auto" mr={{base: 'auto', md: 0}}>
        <Flex flexDir={{base: 'column', md: 'row'}} alignItems="center" mt={{base: 6, md: '10%', lg: '20%'}}>
          <Box
            mr={{base: 0, md:6}}
            mb={{base: 4, md: 0}}
            color="brand.secondary"
            textStyle="h1"
            as="h1"
            display="inline"
            whiteSpace="pre-wrap"
            textColor={'#002c39'}
            fontFamily={'Comfortaa'}
            fontSize={'48px'}
            fontWeight={'700'}
            lineHeight={'133%'}
            textAlign={{base: 'center', md: 'right'}}
            cursor="default"
            textShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
          >
            {(desktopDisplay || tabletDisplay)  && `Find a mission has\nnever been easier`}
            {mobileDisplay && `Find a mission has never been easier`}
          </Box>
        </Flex>
        <Box mt={{base: 12, md: 6, lg: 12}} mr="auto" ml={{base: 'auto', md: 0}}>
          <Button
            variant="primary"
            backgroundColor={"#fdb81e"}
            rightIcon={<ArrowRightIcon />}
            onClick={() => setSignupModalOpen(true)}
          >
            Try for free
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProductFreelance;
