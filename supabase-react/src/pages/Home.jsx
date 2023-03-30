import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const Home = ({ session }) => {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        async function getProfile() {
        const { user } = session

        let { data, error } = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
            .eq('id', user.id)
            .single()

        if (error) {
            console.warn(error)
        } else if (data) {
            setUsername(data.username)
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
        }

        setLoading(false)
        }

        getProfile()
    }, [session])

    return ( 
        <div>
            <h1>Home</h1>
            <div>
                <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
     );
}
 
export default Home;