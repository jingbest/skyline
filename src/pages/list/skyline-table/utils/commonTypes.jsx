import PropTypes from 'prop-types'

export default {
    tableActions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        onClick: PropTypes.func,
        id: PropTypes.string.isRequired,
    })),
    number: PropTypes.number,
}
