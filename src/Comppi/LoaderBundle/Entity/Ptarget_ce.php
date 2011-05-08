<?php

namespace Comppi\LoaderBundle\Entity;

/**
 * @orm:Entity
 */
class Ptarget_ce
{
    /**
     * @orm:Id
     * @orm:Column(type="integer")
     * @orm:GeneratedValue(strategy="AUTO")
     */
    protected $id;

    
    /**
     * @orm:Column(type="string", length="512")
     */
    protected $name;
    
    /**
     * @orm:Column(type="string", length="512")
     */
    protected $localization;
    
    /**
     * @orm:Column(type="string", length="512")
     */
    protected $weight;
    
}