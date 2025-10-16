import { Helmet } from 'react-helmet-async'
import { CategoriesSection } from '../components/guides/CategoriesSection'
import { DarkFooter } from '../components/shared/DarkFooter'
import { Breadcrumb } from '../components/shared/Breadcrumb'

export default function HomePage() {
  const breadcrumbItems = [{ label: 'Guides' }]

  return (
    <>
      <Helmet>
        <title>ClonePartner Guides</title>
        <meta 
          name="description" 
          content="Explore our collection of guides and tutorials" 
        />
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Categories Section */}
      <div className="bg-gray-50">
        <CategoriesSection />
      </div>

      {/* Dark Footer */}
      <DarkFooter />
    </>
  )
}
