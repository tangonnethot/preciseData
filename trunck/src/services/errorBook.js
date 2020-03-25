import { get, post } from '../utils/request';
import { pathJoin } from '../utils/utils';
import { prefix, ErrorBookPrefix } from '../services/config';

export const getErrorBook = (params = {}) => {
    return get(pathJoin(prefix, ErrorBookPrefix, "ctbStudent/list/v1.0"), { ...params }).then(res => {
        return res;
    });
};