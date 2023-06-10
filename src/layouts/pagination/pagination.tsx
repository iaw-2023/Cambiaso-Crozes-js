
import DataPagination from '../../models/dataPagination';
import { useNavigate } from "react-router-dom";

import Pagination from 'react-bootstrap/Pagination';

function CheesePagination(props: DataPagination) {

    let navigate = useNavigate();
    let items = [];
    for (let number = 1; number <= props.last_page; number++) {
        items.push(
            <Pagination.Item key={number} active={number === props.current_page} onClick={() => navigate(props.url + '/page/' + number)}>
            {number}
            </Pagination.Item>,
        );
    }

    return(
        <div>
            <Pagination className="pagination-cheese">{items}</Pagination>
        </div>
    );
}

export default CheesePagination;