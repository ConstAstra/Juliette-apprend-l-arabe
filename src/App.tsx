import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { AlphabetPage } from './pages/AlphabetPage'
import { LetterPage } from './pages/LetterPage'
import { RecognitionPage } from './pages/RecognitionPage'
import { TiersPage } from './pages/TiersPage'
import { TierPage } from './pages/TierPage'
import { VocabularyPage } from './pages/VocabularyPage'
import { ThemePage } from './pages/ThemePage'
import { ProgressPage } from './pages/ProgressPage'
import { ProfilesPage } from './pages/ProfilesPage'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="alphabet" element={<AlphabetPage />} />
          <Route path="alphabet/exercice" element={<RecognitionPage />} />
          <Route path="alphabet/:letterId" element={<LetterPage />} />
          <Route path="paliers" element={<TiersPage />} />
          <Route path="paliers/:tierId" element={<TierPage />} />
          <Route path="paliers/:tierId/:tab" element={<TierPage />} />
          <Route path="vocabulaire" element={<VocabularyPage />} />
          <Route path="vocabulaire/:themeId" element={<ThemePage />} />
          <Route path="progres" element={<ProgressPage />} />
          <Route path="profils" element={<ProfilesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
