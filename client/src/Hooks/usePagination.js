import {useReducer} from "react"

export default function usePagination(totalPages) {
    const reducer = (state, action) => {
        if (action.type === "INCREASE") {
            return { page: state.page + 1 }
        } else if (action.type === "DECREASE") {
            return { page: state.page - 1 }
        } else {
            return { page: 1 }
        }
    }

    const [pageState, dispatch] = useReducer(reducer, { page: 1 })

    const handlePage = (order) => {
        if (order === "INCREASE" && pageState.page < totalPages) {
            dispatch({ type: order })
        } else if (order === "DECREASE" && pageState.page > 1) {
            dispatch({ type: order })
        } else {
            dispatch({ type: "RESET" })
        }
    }

    return [handlePage, pageState]
}

export {usePagination}