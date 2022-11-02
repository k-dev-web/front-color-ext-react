import {
    IonContent,
    IonHeader,
    IonPage,
    IonRow,
    IonTitle,
    IonButton,
    IonGrid,
    IonLabel,
    IonCol
} from '@ionic/react';
import './Colors.scss';
import {ColorsProvider} from "../../providers/colors";
import {Auth} from "../../providers";
import {useEffect, useState} from "react";

const Colors: React.FC = () => {

    const {getColors} = ColorsProvider();
    const {logout} = Auth();
    const [data, setData] = useState<{
        countColors: any[],
        countSite: any[],
        colorsList: any[],
        countItems: number

    }>({
        countColors: [],
        countSite: [],
        colorsList: [],
        countItems: 1
    });
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        loadData(currPage);
    }, [currPage])

    const loadData = async (page = 1) => {
        let tmpData = await getColors(page);
        console.log(tmpData)
        setData(tmpData);
    }


    const getVisiblePages: any = () => {
        let pages = [];
        for (let i = 0; i < data.countItems / 20; i++) {
            pages.push(i + 1);
        }
        return pages;
    }
    const getMathFloor = (numb: number) => {
        return Math.floor(numb);
    }

    const logOut = () => {
        logout();
    }
    return (
        <IonPage>
            <IonHeader>
                <IonTitle>{'COLOR PICKER'}</IonTitle>
                <IonLabel>{'admin panel'}</IonLabel>
                <IonButton color="medium" style={{color: 'blue'}} onClick={logOut}>Exit</IonButton>
            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol>
                        <IonTitle>{'POPULAR SITES'}</IonTitle>
                        <IonGrid className="table">
                            <IonRow>
                                <IonCol size="1">{'№'}</IonCol>
                                <IonCol>{'site'}</IonCol>
                                <IonCol size="2">{'count'}</IonCol>
                            </IonRow>
                            {
                                data.countSite.map((item: any, i: number) => {
                                    return <IonRow key={'countS' + i}>
                                        <IonCol size="1">{i + 1}</IonCol>
                                        <IonCol>{item.domain}</IonCol>
                                        <IonCol size="2">{item.domainCount}</IonCol>
                                    </IonRow>
                                })
                            }


                        </IonGrid>
                    </IonCol>
                    <IonCol>
                        <IonTitle>{'POPULAR COLORS'}</IonTitle>
                        <IonGrid className="colors">
                            {
                                data.countColors.map((i: any) => {
                                    return <div key={'countC' + i} className="square"
                                                style={{background: i.hex}}>{i.hex}</div>
                                })
                            }
                        </IonGrid>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonGrid className="table">
                        <IonRow>
                            <IonCol>{'Page'}</IonCol>
                            <IonCol size="0.4">{'Color'}</IonCol>
                            <IonCol size="1">{'Color code'}</IonCol>
                            <IonCol size="1">{'Element type'}</IonCol>
                            <IonCol size="2">{'Date and time'}</IonCol>
                        </IonRow>
                        {
                            data.colorsList.map((item: any, i: number) => {

                                return <IonRow key={'color' + i}>
                                    <IonCol><a href={item.site} target="_blank">{item.site}</a></IonCol>
                                    <IonCol size="0.4">
                                        <div className="circle" style={{background: item.hex}}></div>
                                    </IonCol>
                                    <IonCol size="1">{item.rgb}<br/>{item.hex}</IonCol>
                                    <IonCol size="1">{item.type}</IonCol>
                                    <IonCol size="2">{item.createdAt}</IonCol>

                                </IonRow>
                            })}
                        <div className="pagination ">
                            <button
                                disabled={currPage === 1}
                                onClick={() => setCurrPage(1)}>
                                {'<<'}
                            </button>
                            <button
                                disabled={currPage === 1}
                                onClick={() => setCurrPage(currPage - 1)}>
                                {'<'}
                            </button>
                            {
                                getVisiblePages().map((page: any, i: number) => {
                                    return <button
                                        key={'button' + i}
                                        className={currPage === page ? 'selected' : ""}
                                        onClick={() => setCurrPage(page)}>
                                        {page}
                                    </button>
                                })

                            }
                            <button
                                disabled={currPage === getMathFloor(data.countItems / 20) + 1}
                                onClick={() => setCurrPage(currPage + 1)}>
                                {'>'}
                            </button>
                            <button
                                disabled={currPage === getMathFloor(data.countItems / 20) + 1}
                                onClick={() => setCurrPage(getMathFloor(data.countItems / 20) + 1)}>
                                {'>>'}
                            </button>
                        </div>
                    </IonGrid>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};


export default Colors;
