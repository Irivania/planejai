import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SimulationFormData, simulationFormSteps } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { FormStep } from '../FormStep'
import { StepProgress } from '../Progress'

export const SimulationForm = () => {
  const navigate = useNavigate()
  const { saveFormData } = useSimulationStorage()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<Partial<SimulationFormData>>({})

  const totalSteps = simulationFormSteps.length
  const currentStep = simulationFormSteps[currentStepIndex]

  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1

  // Correção do erro TS(7053): type assertion na chave do SimulationFormData
  const currentStepKey = currentStep.id as keyof SimulationFormData
  const currentValue = formData[currentStepKey] ?? ''
  const isValid = currentValue.trim().length > 0 && currentValue !== '0'

  const handleValueChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStepKey]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValid) return

    if (isLastStep) {
      const fullFormData = formData as SimulationFormData
      const id = saveFormData(fullFormData)

      setFormData({})
      setCurrentStepIndex(0)

      void navigate(`/resultado/${id}`)
      return
    }

    setCurrentStepIndex((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    if (isFirstStep) return
    setCurrentStepIndex((prev) => prev - 1)
  }

  return (
    <>
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        value={currentValue}
        onChange={handleValueChange}
        onSubmit={handleSubmit}
        onBack={handlePreviousStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isValid={isValid}
      />
    </>
  )
}

export default SimulationForm