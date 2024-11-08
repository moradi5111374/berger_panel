import { FC, useEffect, useState } from 'react';
import styles from './style.module.css'
import { SettingFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import Drower from '../drower';
import { product } from '../../utils/ProductType';
import { productList } from './MockData'
import EditProduct from '../EditProduct';

type IProps = {

}

const Product: FC<IProps> = props => {

    const [newProduct, setNewProduct] = useState<product>();
    const [productId, setProductId] = useState<string | number | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleNewProduct = (product: product) => {
        productList.push(product)
        setNewProduct(product)
    }

    const handelOpenModal = (id: any) => {
        setShowModal(true);
        setProductId(id);
    }

    const handleClose = (closeModal: any) => {
        setShowModal(closeModal)
    }

    useEffect(() => {}, [newProduct])

    return (
        <div className={styles.products}>
            {
                productList.map((product:product) => (
                    <div className={styles.product} key={product.id}>
                        <img src={product.icon} />
                        <span className={styles.title}>{product.title}</span>
                        <span className={styles.weight}>{product.weight}g</span>
                        <div className={styles.ingredient}>
                            {product.Ingredients.map(ingredient => (
                                <span className={styles.about}>{ingredient},</span>
                            )) }
                        </div>
                        <div className={styles.footer}>
                            <span>${product.price}</span>
                            <div>
                                <div className={`${product.see ? '' : styles.not_active} ${styles.border} `}>
                                    {
                                        product.see ? <EyeFilled/> : <EyeInvisibleFilled/>
                                    }
                                </div>
                                <div className={styles.border}>
                                    <SettingFilled onClick={() => handelOpenModal(product.id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className={styles.add_product}>
                <Drower newProduct={handleNewProduct}/>
            </div>
            <EditProduct isOpenModal={showModal} isCloseModal={handleClose} productId={productId}/>
        </div>
    );
};

export default Product;