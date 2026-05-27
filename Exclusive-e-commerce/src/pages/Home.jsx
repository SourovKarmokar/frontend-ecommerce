import Container from "../components/container/Container";
import Banner from "../components/banner/Banner";
import FlashSales from "../components/flashsales/FlashSales";
import Catagories from "../components/catagories/Catagories";
import BestSelling from "../components/bestSelling/BestSelling";
import PromotionalProduct from "../components/promotionalProduct/PromotionalProduct";
import OurProducts from "../components/ourProducts/OurProducts";
import Featured from "../components/featured/Featured";

export default function Home() {
  return (
    <>
      <Container>
        <Banner />
        <FlashSales />
        <Catagories />
        <BestSelling />
        <PromotionalProduct />
        <OurProducts/>
        <Featured/>
      </Container>
    </>
  );
}
