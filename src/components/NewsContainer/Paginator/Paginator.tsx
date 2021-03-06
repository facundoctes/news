import React from 'react';
import { Pagination } from 'react-bootstrap';

interface IPaginatorProps {
    page: number;
    pageSize: number;
    totalCount: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Paginator = React.memo((props: IPaginatorProps) => {
    const printPages = (page: number, pageSize : number, totalCount: number) =>{
        const items = [];

        const totalPages:number = Math.ceil(totalCount/pageSize);
        const start: number = (page-3) < 1 ? 1 : (page-3);
        const end: number = (start + 6) > totalPages ? totalPages : (start + 6);

        if (start > 1) {
            items.push(<Pagination.First key="first" onClick={() => props.setPage(1)} />);
        }

        for (let x=start; x <= end; x++ ) {
            items.push(
                <Pagination.Item key={x} active={ x === page } onClick={() => props.setPage(x)}>
                    { x }
                </Pagination.Item>
            )
        }

        if (end < totalPages) {
            items.push(<Pagination.Last key="last" onClick={() => props.setPage(totalPages)}/>)
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
});

export default Paginator;