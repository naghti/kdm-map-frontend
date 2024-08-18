import React, {useEffect, useState} from 'react';
import {usePointsStore} from "../store/Store";
import Navbar from "../components/Navbar/Navbar";
import Map from "../components/Map/Map";
import FilterByText from "../components/Filter/FilterByText";
import FilterBySelection from "../components/Filter/FilterBySelection";
import Button from "../components/Button/Button";
import BoxWidth from "../components/Box/BoxWidth";
import GradientText from "../components/Text/GradientText";
import Point from "../components/Point/Point";
import Footer from "../components/Footer/Footer";
import BoxPosition from "../components/Box/BoxPosition";
import PointActive from "../components/Point/PointActive";
import {getAll} from "../http/pointAPI";
import {nextConfig} from "../next.config";
import Head from 'next/head';
import Loader from '../components/Loader/Loader';
import PointsList from '../components/PointsList';


const Index = () => {
    const {points, changePoints, changeFilterByType, changeFilterByNosological, filteredPoints, changeFilterByText} = usePointsStore()

    const getPoints = async () => {
        const response = await getAll();
        changePoints(response["points"] || []);
    }

    useEffect(() => {
        getPoints()
    }, []);

    let PointsTypes = new Set()
    points.map(point => PointsTypes.add(point.type))
    PointsTypes = Array.from(PointsTypes)

        return (
        <>
            <Head>
                <meta name="keywords" content="Сайт мест досуга по Пушкинской карте для маломобильных граждан" />
                <meta name="description" content="Культурный Доступный Мой - сайт, посвященный доступным культурным местам для маломобильных граждан." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Культурный Доступный Мой</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
        <BoxPosition>
            <Navbar />
            <Map/>
            <BoxWidth className={"contentBox"}>
                <div style={{padding: "30px 0", display: "flex", justifyContent:"space-between"}} className={" flex-column flex-md-row"}>
                    <FilterByText
                        changedFunction={changeFilterByText}
                        placeholder={"Тип учреждения"}
                    />
                    <FilterBySelection
                        changedFunction={changeFilterByType}
                        placeholder={nextConfig.filterByTypeStockValue}
                    >
                        {
                            PointsTypes.map((point, index) => (
                                <option
                                    value={point}
                                    key={index}
                                >
                                    {point}
                                </option>
                            ))
                        }
                    </FilterBySelection>
                    <FilterBySelection
                        changedFunction={changeFilterByNosological}
                        placeholder={nextConfig.filterByNosologicalStockValue}
                    >
                        {
                            Object.keys(nextConfig.nosologicalGroup).map((point, index) => (
                                <option
                                    value={point}
                                    key={index}
                                >
                                    {nextConfig.nosologicalGroup[point]}
                                </option>
                            ))
                        }
                    </FilterBySelection>
                    <Button text={"ПОИСК"}/>
                </div>
                <div className={"display-5"}>
                    <GradientText>Учреждения культуры и досуга Новосибирска и НСО, участвущие в программе “Пушкинская карта”:</GradientText>
                </div>
                <div 
                    style={{display: "flex", flexWrap: "wrap", margin: "20px 0 50px"}}
                >
                <PointsList/>
                </div>
            </BoxWidth>
            <Footer/>
        </BoxPosition>
        </>
    );
};

export default Index;