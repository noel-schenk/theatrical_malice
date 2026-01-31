import type { AdvancedMaskProps } from '@/components/AdvancedMask/AdvancedMask'

export class PlayerType {
  constructor(
    public advancedMaskProperty: AdvancedMaskProps,
    public maskUUID: string,
    public playerUUID?: string,
    public found: boolean = false
  ) {}
}
