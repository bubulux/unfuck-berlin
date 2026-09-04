import { useEffect, useId, useRef, useState } from 'react'
import { Icon } from '../../atoms/icon'
import './styles.css'

export interface MultiSelectProps {
  /** Label shown in the trigger while nothing is selected. */
  label: string
  options: string[]
  selected: string[]
  onChange: (next: string[]) => void
  className?: string
}

/**
 * A compact multi-select dropdown: a trigger button that opens a checkbox
 * popover. Closes on outside-click or Escape. Purpose-built for the events
 * filter bar — no external dependency.
 */
export function MultiSelect({ label, options, selected, onChange, className }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option],
    )
  }

  const classes = ['multi-select', open ? 'multi-select--open' : '', className]
    .filter(Boolean)
    .join(' ')

  const triggerText = selected.length ? `${label} (${selected.length})` : label

  return (
    <div className={classes} ref={rootRef}>
      <button
        type="button"
        className="multi-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="multi-select__trigger-label">{triggerText}</span>
        <Icon name="chevron-right" className="multi-select__chevron" aria-hidden />
      </button>
      {open ? (
        <ul className="multi-select__menu" id={listId} role="listbox" aria-multiselectable="true">
          {options.map((option) => {
            const checked = selected.includes(option)
            return (
              <li key={option} className="multi-select__option" role="option" aria-selected={checked}>
                <label className="multi-select__label">
                  <input
                    type="checkbox"
                    className="multi-select__checkbox"
                    checked={checked}
                    onChange={() => toggle(option)}
                  />
                  <span>{option}</span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default MultiSelect
