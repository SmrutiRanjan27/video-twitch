interface UserPageParams {
    params: {
        username: string
    }
}

const UserPage = ({params} : UserPageParams) => {
    return (
        <div>
            User : {params.username}
        </div>
    )
}

export default UserPage;