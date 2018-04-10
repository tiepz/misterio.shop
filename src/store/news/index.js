import * as firebase from 'firebase'

export default {
  state: {
    news: {} // article, sale
  },
  mutations: {
    setNews:
      (state, payload) => {
        state.news = payload
      }
  },
  actions: {
    loadNews:
      ({commit, dispatch}) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').get()
          .then(snap => {
            let news = {}
            snap.docs.forEach(doc => {
              news[doc.id] = doc.data()
            })
            commit('setNews', news)
            commit('LOADING', false)
            console.log('Fetched: news data')
          })
          .catch(err => dispatch('LOG', err))
      },
    addNews:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').add(payload)
          .then(docRef => {
            let news = getters.news
            news[docRef.id] = payload
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    updateNewsInfo:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').doc(payload.newsId).update(payload.updateData)
          .then(() => {
            let news = getters.news
            news[payload.newsId] = Object.assign(news[payload.newsId], payload.updateData)
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    updateNewsImage:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        dispatch('subscribeToNewsUpdate', payload.newsId)
        // "img_0" for probably increase of images count in the future
        firebase.storage().ref('news/' + payload.newsId + '/img_0').put(payload.image)
          .then(() => {
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    subscribeToNewsUpdate: // realtime change images
      ({commit, getters}, payload) => {
        let news = getters.news
        firebase.firestore().collection('news').doc(payload)
          .onSnapshot(doc => {
            news[doc.id] = doc.data()
            commit('setNews', {...news})
          })
      },
    deleteNews:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').doc(payload).delete()
          .then(() => {
            if (getters.newsById(payload).img_0) {
              return Promise.all([ // see cloud functions "createNewsThumbnail"
                firebase.storage().ref('news/' + payload + '/img_0').delete(),
                firebase.storage().ref('news/' + payload + '/thumb_img_0').delete()
              ])
            }
          })
          .then(() => {
            let news = getters.news
            delete news[payload]
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    news:
      state => {
        return state.news
      },
    newsById:
      state => (newsId) => {
        return state.news[newsId]
      }
  }
}