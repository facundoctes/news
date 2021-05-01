import React from 'react';
import { Pagination } from 'react-bootstrap';

interface IPaginatorProps {
    page: number;
    pageSize: number;
    totalCount: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Paginator = React.memo((props: IPaginatorProps) => {
    console.log('render', 'paginator');

    const printPages = (page: number, pageSize : number, totalCount: number) =>{
        const items = [];

        const totalPages:number = Math.ceil(totalCount/pageSize);
        const start: number = (page-5) < 0 ? 0 : (page-5);
        const end: number = (start + 10) > totalPages ? totalPages : (start + 10) ;

        if (start > 0) {
            items.push(<Pagination.First key="first" onClick={() => props.setPage(0)} />)
        }

        for (let x=start; x < end; x++ ) {
            items.push(
                <Pagination.Item key={x} active={ x === page } onClick={() => props.setPage(x)}>
                    { x + 1 }
                </Pagination.Item>
            )
        }

        if (end < totalPages) {
            items.push(<Pagination.Last key="last" onClick={() => props.setPage(totalPages-1)}/>)
        }

        return items;
    }

    return (
        <div>   
            	<Pagination>
                    {
                        printPages(props.page, props.pageSize, props.totalCount).map((item) => item)
                    }
				</Pagination>
        </div>
    );
})

export default Paginator;