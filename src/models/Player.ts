import type { AdvancedMaskProps } from '@/components/AdvancedMask/AdvancedMask'

export class Player {
  constructor(
    public advancedMaskProperty: AdvancedMaskProps,
    public maskUUID: string,
    public playerUUID?: string
  ) {}
}
