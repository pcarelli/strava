import React from 'react'
import {auth} from '../firebase'
import app from '../firebase'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import firebase from 'firebase/compat/app'

const db = getFirestore(app)


const AuthContext = React.createContext()

export function useAuth(){
    return React.useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = React.useState()
    const [currentUserDetails, setCurrentUserDetails] = React.useState()
    const [loading, setLoading] = React.useState(true)

    function signup(email, password){
        return (
            auth.createUserWithEmailAndPassword(email, password)
            .then(u => {
                const user = firebase.auth().currentUser
                return setDoc(doc(db, 'users', user.uid), {
                    firstName: '',
                    lastName: '',
                    clientID: '',
                    clientSecret: '',
                    accessToken: '',
                    accessTokenExpireDate: new Date(),
                    refreshToken: ''
                })
            })
        )
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            const docRef = doc(db, 'users', user.uid)
            setCurrentUser(user)
            getDoc(docRef).then(snapshot => setCurrentUserDetails(snapshot.data()))
            setLoading(false)
        })

        return unsubscribe
        
    }, [])
    
    
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        currentUserDetails
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}