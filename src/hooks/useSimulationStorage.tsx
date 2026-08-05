// src/hooks/useSimulationStorage.ts
import { useCallback } from 'react'
import type { ChatMessage, SimulationFormData, SimulationRecord } from '@/data/simulation'

const LOCAL_STORAGE_KEY = '@planejai:simulations'

export const useSimulationStorage = () => {
  const getSimulations = useCallback((): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storage ? (JSON.parse(storage) as SimulationRecord[]) : []
  }, [])

  const getFormData = useCallback(
    (id: string): SimulationRecord | undefined => {
      const simulations = getSimulations()
      return simulations.find((s) => s.id === id)
    },
    [getSimulations],
  )

  const saveFormData = useCallback((formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const newRecord: SimulationRecord = {
      ...formData,
      id,
      chatHistory: [], // Inicializa a lista de mensagens vazia
    }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const currentData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([newRecord, ...currentData]),
    )

    return id
  }, [])

  const updateSimulation = useCallback((id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }, [])

  // 💡 Adiciona uma nova mensagem do chat ao histórico da simulação no localStorage
  const saveChatMessage = useCallback(
    (simulationId: string, message: ChatMessage) => {
      const simulations = getSimulations()
      const updated = simulations.map((record) => {
        if (record.id === simulationId) {
          const currentChat = record.chatHistory || []
          return {
            ...record,
            chatHistory: [...currentChat, message],
          }
        }
        return record
      })

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    },
    [getSimulations],
  )

  const deleteSimulation = useCallback(
    (id: string) => {
      const simulations = getSimulations()
      const updated = simulations.filter((s) => s.id !== id)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    },
    [getSimulations],
  )

  return {
    getSimulations,
    getFormData,
    saveFormData,
    updateSimulation,
    saveChatMessage, // 👈 Exportada para uso no AIInsightCard
    deleteSimulation,
  }
}