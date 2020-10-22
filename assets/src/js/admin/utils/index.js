// global utilities
import * as Utils from '../../utils';

// local utilities
import dismissNotice from './admin-notice';
import Advertisement from './advertisement';
import DropdownPages from './dropdown-pages';
import AdvancedList from './advanced-list';
import isEmail from '../../utils/email-validator';
import ModalSearchUsers from './modal-search-users';
import ModalSearchItems from './modal-search-items';
import SearchItems from './search-items';

export default {
	...Utils,
	dismissNotice,
	Advertisement,
	DropdownPages,
	AdvancedList,
	isEmail,
	ModalSearchItems,
	ModalSearchUsers,
};
