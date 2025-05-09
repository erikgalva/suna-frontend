"use client"

import { useEffect, useState } from "react"
import { SidebarLeft } from "@/components/sidebar/sidebar-left"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { PricingAlert } from "@/components/billing/pricing-alert"
import { MaintenanceAlert } from "@/components/maintenance-alert"
import { useAccounts } from "@/hooks/use-accounts"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [showPricingAlert, setShowPricingAlert] = useState(false)
  const [showMaintenanceAlert, setShowMaintenanceAlert] = useState(false)
  const { data: accounts } = useAccounts()
  const personalAccount = accounts?.find(account => account.personal_account)

  useEffect(() => {
    const isSelfHosted = true; // forza la modalità self-hosted
    setShowPricingAlert(!isSelfHosted) // mostra il paywall solo se non è self-hosted
    setShowMaintenanceAlert(false)
  }, [])

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <div className="bg-background">
          {children}
        </div>
      </SidebarInset>

      {/* Paywall disattivato se self-hosted */}
      <PricingAlert 
        open={showPricingAlert} 
        onOpenChange={setShowPricingAlert}
        closeable={false}
        accountId={personalAccount?.account_id}
      />

      <MaintenanceAlert
        open={showMaintenanceAlert}
        onOpenChange={setShowMaintenanceAlert}
        closeable={true}
      />
    </SidebarProvider>
  )
}
